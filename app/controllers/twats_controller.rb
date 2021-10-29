class TwatsController < ApplicationController
  
  def index
    @twats = Twat.all 
    render json: @twats
  end

  def show
    @twat = Twat.find_by(id: params[:id])
    render json: @twat
  end

  def new
    @twat = Twat.new
  end

  def create 
    @twat = Twat.new(twat_parameters)
    if @twat.save
      render json: @twat
    else
      render json: @twat.errors.full_messages, status: 400
    end
  end

  def edit 
    @twat = Twat.find_by(id: params[:id])
  end

  def update
    @twat = Twat.find_by(id: params[:id])
    
    if @twat.update(twat_parameters)
      render json: @twat 
    else
      render json: @twat.errors.full_messages, status: 400
    end
  end

  def destroy 
    @twat = Twat.find_by(id: params[:id])
    @twat.destroy 
  end

  private 

  def twat_parameters
    params.require(:twat).permit(:id, :body, :user_id, :created_at, :updated_at)
  end
end