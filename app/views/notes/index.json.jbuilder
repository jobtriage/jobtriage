# frozen_string_literal: true

json.array! @notes do |note|
    json.partial! 'note', note: note
end
