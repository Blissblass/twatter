class Api::TwatsController < ApplicationController

  def get_all_twats
    twat_preload = Twat.all.includes(:user).order(created_at: :desc)
    @twats = twat_preload.map do |twat|
      twat.attributes.merge(
        'poster' => twat.user.username
      )
    end
    render json: @twats
  end

  def twat_exists
    @like = Twat.find_by(id: params[:id]).likes.where('user_id = ? AND twat_id = ?', params[:user_id], params[:id])

    if @like
      render json: @like, status: 200
    else
      render body: nil, status: 404
    end
  end

  def home_twats
    @twats = []
    current_user.follows.each do |f|
      preload = Twat.all.where(user_id: f.followee_id).includes(:user).order(created_at: :desc)
      user_twats = preload.map do |twat|
        twat.attributes.merge(
          'poster' => twat.user.username
        )
      end
      @twats << user_twats
    end
    
    if @twats
      render json: @twats, status: 200
    else
      render json: {"error" => "#{current_user.username}, please follow another user to see posts on your timeline!"}, status: 404
    end
  end

end