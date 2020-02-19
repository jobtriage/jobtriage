class ApplicationsController < ApplicationController
  # Get all Job applications
  def index
    render json: { message: current_user.applications }, status: :ok
  end

  # Create job application
  def create
    application = current_user.applications.new(application_params)
    application.set_company params[:company_name], params[:company_url]

    render json: { message: application }, status: :ok if application.save!
  end

  # Update job application
  def update
    application = current_user.applications.find(params[:id])
    if params[:company_name]
      application.set_company params[:company_name], params[:company_url]
    end

    render json: { message: application }, status: :ok if application.update_attributes!(application_params)
  end

  # Delete job application
  def destroy
    current_user.applications.where(id: params[:id]).delete
  end

  private

  def application_params
    params.permit(:title, :description, :url, :location, :status, :priority)
  end
end
