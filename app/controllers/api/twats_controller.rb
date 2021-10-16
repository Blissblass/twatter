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

end