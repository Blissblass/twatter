class FollowsController < ApplicationController 

  def index
    @follows = Follow.all
    render json: @follows
  end

  def new 
    @follow = Follow.new
  end

  def create 
    @follow = Follow.new(follow_params)

    if @follow.save 
      render json: @follow, status: 200
    else
      render body: nil
    end
  end

  def destroy
    @follow = Follow.find_by(id: params[:id])
    @follow.destroy
  end

  private

  def follow_params 
    params.require(:follow).permit(:follower_id, :followee_id)
  end

end