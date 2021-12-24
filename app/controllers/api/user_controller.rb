class Api::UserController < ApplicationController 

  def get_user_profile
    @user = User.includes(:twats).find_by(id: params[:id])
    @twats = @user.twats.order(created_at: :desc).map do |twat|
        if twat.media.attached?
          twat.attributes.merge(
            'poster' => twat.user.username,
            'image' => url_for(twat.user.image),
            'media' => url_for(twat.media),
            'media_type' => twat.media.content_type
          )
        else
          twat.attributes.merge(
            'poster' => twat.user.username,
            'image' => url_for(twat.user.image),
          )
        end
      end

    if @user
      render json: { user: @user, twats: @twats, additionalData: { image: url_for(@user.image), followers: @user.followers.count, follows: @user.follows.count } }
    else
      render body: nil, status: 404
    end
  end

  def search_for_user
    return render json: [] if params[:query].length < 3

    @users = User.where("username LIKE ?", "%#{params[:query]}%")

    if @users
      render json: @users, status: 200
    else
      render body: nil
    end
  end

  def change_user_image
    return if params[:img].nil? || params[:id].nil?

    current_user = User.find(params[:id])

    current_user.image.attach(io: params[:img], filename: "profPic#{current_user.id}", content_type: "image/jpg" )
  end

  def update_user
    @user = User.find(params[:id])

    if @user.update(user_params)
      render json: @user 
    else
      render json: @user.errors.full_messages
    end

  end

  def get_user_followers
    @user = User.find(params[:id])
    @followers = @user.followers.map do |data|
      mapUser = User.find(data.follower_id)
      [mapUser, url_for(mapUser.image)]
    end
    render json: @followers
  end

  def get_user_follows
    @user = User.find(params[:id])
    @follows = @user.follows.map do |data|
      mapUser = User.find(data.followee_id)
      [mapUser, url_for(mapUser.image)]
    end
    render json: @follows
  end

  def get_follow_recommendations
    @user = User.find(params[:id])

    if @user.follows.empty?
      recommendations = User.where.not(id: @user.id).order(Arel.sql('RANDOM()')).limit(3)
      data = recommendations.map { |user| { user: user, image: url_for(user.image) } }

      render json: data
    else
      first_users = User.order(Arel.sql('RANDOM()')).limit(3)
      
      recommendations = []
      # We make 2 restrictions for the query, the user *must* have at least 1 follower, and the user must *not* be the current user
      first_users.each { |user| recommendations << get_random_user_follow(user, @user.id) }

      data = recommendations
          .filter { |user| user != nil }
          .map { |user| { user: user, image: url_for(user.image) } }

      render json: data
    end
  end

  private

  def user_params
    params.require(:user).permit(:username)
  end

  def get_random_user_follow(user, userId)
    current_user = User.find(userId)
    follow = user.follows.where.not(followee_id: current_user.id).order(Arel.sql('RANDOM()')).limit(1)[0]
    return nil if follow.nil? || user.id == current_user.id
    follow.followee
  end

end