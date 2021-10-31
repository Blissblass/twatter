class Api::UserController < ApplicationController 

  def get_current_user
    @user = current_user
    
    if @user
      data = {username: @user.username, id: @user.id, image: url_for(@user.image)}
      render json: data
    else
      render body: nil, status: 404
    end
  end

  def get_user_profile
    @user = User.includes(:twats).find_by(id: params[:id])
    @twats = @user.twats.order(created_at: :desc).map do |twat|
      twat.attributes.merge(
        'poster' => @user.username,
      )
    end

    if @user
      render json: { user: @user, twats: @twats, image: url_for(@user.image) }
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
    return if params[:img].nil?

    current_user.image.attach(io: params[:img], filename: "profPic#{current_user.id}", content_type: "image/jpg" )
  end

  def update_user
    @user = current_user

    if @user.update(user_params)
      render json: @user 
    else
      render json: @user.errors.full_messages
    end

  end
  
  private

  def user_params
    params.require(:user).permit(:username)
  end

end