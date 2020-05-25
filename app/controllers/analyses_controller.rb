class AnalysesController < ApplicationController

  before_action :set_analyses
  before_action :set_analysis, except: %i[index create]

  def index
  end

  def show
  end

  def create
    @analysis = current_user.analyses.new(analysis_params)
    render(:show, status: :created) if @analysis.save!
  end

  def update
    render(:show, status: :ok) if @analysis.update_attributes!(analysis_params)
  end

  def destroy
    @analysis.destroy
    render(:show, status: :ok)
  end

  private

  def set_analyses
    @analyses = current_user.analyses
  end

  def set_analysis
    @analysis = @analyses.find(id: params[:id])
  end

  def analysis_params
    params.permit(:title, :content)
  end
end
