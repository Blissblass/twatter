class Api::UserController < ApplicationController 

  def get_current_user
    @user = current_user
    if @user
      render json: @user
    else
      render body: nil, status: 404
    end
  end

  def get_user_profile
    @user = User.includes(:twats).find_by(id: params[:id])
    @twats = @user.twats.order(created_at: :desc).map do |twat|
      twat.attributes.merge(
        'poster' => @user.username
      )
    end

    if @user
      render json: { user: @user, twats: @twats }
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

end