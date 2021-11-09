class CommentsController < ApplicationController

  def new
    @comment = Comment.new
  end

  def create 
    @comment = Comment.new(comment_params)
    if @comment.save 
      render json: @comment 
    else
      render json: { msg: 'Something went wrong!', type: 'err' }
    end
  end

  def edit
    @comment = Comment.find_by(params[:id])
  end

  def update 
    @comment = Comment.find_by(params[:id])
    if @comment.update(comment_params)
      render json: @comment 
    else
      render json: { msg: 'Something went wrong!', type: 'err' }
  end

  def destroy
    @comment = Comment.find_by(params[:id])
    @comment.destroy
  end

  private

  def comment_params
    params.require(:post).permit(:post_id, :user_id, :body)
  end

end