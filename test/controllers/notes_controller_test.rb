require 'test_helper'

class NotesControllerTest < ActionDispatch::IntegrationTest
  test 'Should get all notes' do
    application = add_application
    add_notes(application, 'Test title','Test content')
    get_request application_notes_url(application)

    json = assert_json_response
    assert_json_keys json.first, :id, :content, :title
  end

  test 'Should add a note' do
    application = add_application
    post_request application_notes_url(application), content: 'Test content', title: 'Test title'
    json = assert_json_response
    assert_json_keys json, :id, :content, :title
  end

  test 'Should update a note' do
    application = add_application
    note = add_notes(application, 'Test title', 'Test content')
    put_request application_note_url(application, note), content: 'Sample'
    json = assert_json_response
    assert_json_keys json, :id, :content, :title
    assert_equal json[:content], 'Sample'
  end

  test 'Should delete a note' do
    application = add_application
    note = add_notes(application, 'Test title', 'Test content')
    delete_request application_note_url(application, note)
    assert_response :success
  end
end
