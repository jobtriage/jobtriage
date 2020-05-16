# frozen_string_literal: true

json.array! @analyses do |analysis|
    json.partial! 'analysis', analysis: analysis
end