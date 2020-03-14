require 'test_helper'

class NoteTest < ActiveSupport::TestCase
  test 'Notes should not be saved without content' do
    application = add_application
    note = application.notes.new
    assert_not note.save, 'Saved note without content'
  end

  test 'Notes should not be saved without title' do
    application = add_application
    note = application.notes.new
    note.content = 'Sample content'
    assert_not note.save, 'Saved note without content'
  end

  test 'Notes should be saved with proper details' do
    application = add_application
    note = application.notes.new
    note.content = 'Sample content'
    note.title = 'Sample title'
    assert note.save, 'Failed when creating content'
  end
end
