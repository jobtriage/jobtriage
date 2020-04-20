class AnalysesController < ApplicationController
  def index
    render json: { message: current_user.analyses }, status: :ok
  end

  def show
    analysis = current_user.analyses.find(params[:id])
    render json: { message: analysis }, status: :ok
  end

  def create
    analysis = current_user.analyses.new(analyses_params)
    render json: { message: analysis }, status: :ok if analysis.save!
  end

  def update
    analysis = current_user.analyses.find(params[:id])
    render json: { message: analysis }, status: :ok if analysis.update_attributes!(analyses_params)
  end

  def destroy
    current_user.analyses.where(id: params[:id]).delete
  end

  private

  def analyses_params
    params.permit(:title, :content)
  end
end
