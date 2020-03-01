require 'test_helper'

class NotesControllerTest < ActionDispatch::IntegrationTest
  test 'Should get all notes' do
    application = add_application
    add_notes(application, 'Test content')
    get_request application_notes_url(application)

    json = assert_json_response
    assert_json_keys json.first, :_id, :content
  end

  test 'Should add a note' do
    application = add_application
    post_request application_notes_url(application), content: 'Test content'
    json = assert_json_response
    assert_json_keys json, :_id, :content
  end

  test 'Should update a note' do
    application = add_application
    note = add_notes(application, 'Test content')
    put_request application_note_url(application, note), content: 'Sample'
    json = assert_json_response
    assert_json_keys json, :_id, :content
    assert_equal json[:content], 'Sample'
  end

  test 'Should delete a note' do
    application = add_application
    note = add_notes(application, 'Test content')
    delete_request application_note_url(application, note)
    assert_response :success
  end
end
