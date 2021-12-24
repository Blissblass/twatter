class Api::FollowsController < ApplicationController


  def already_following?
    @follow = Follow.find_by(follower_id: params[:follower_id], followee_id: params[:followee_id])

    if @follow 
      render json: @follow, status: 200
    else
      render body: nil
    end
  end

  def unfollow
    @follow = Follow.find_by(Follower_id: params[:follower_id], followee_id: params[:followee_id])

    if @follow 
      @follow.destroy
    else
      render body: nil
    end
  end

end