class LikesController < ApplicationController
  
  def index
    @likes = Like.all
    render json: @likes
  end
  
  def new
    @like = Like.new
  end
  
  def create
    @like = Like.new(like_params)
    if @like.save
      render json: @like, status: 200
    else
      render json: @like.errors.full_messages, status: 400
    end
  end

  def destroy
    Like.destroy(params[:id])
  end

  private

  def like_params 
    params.require(:like).permit(:user_id, :twat_id)
  end

end