class NotesController < ApplicationController
  def index
    render json: { message: notes }, status: :ok
  end

  def create
    notes_obj = notes.create(notes_params)
    render json: { message: notes_obj }, status: :ok
  end

  def update
    note = notes.find(id: params[:id])
    render json: { message: note }, status: :ok if note.update_attributes!(notes_params)
  end

  def destroy
    notes.find(id: params[:id]).delete
  end

  private

  def notes
    application = current_user.applications.find(id: params[:application_id])
    application.notes
  end

  def notes_params
    params.permit(:content)
  end
end
