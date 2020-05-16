# frozen_string_literal: true

json.extract! analysis, :title, :content, :id
json.id analysis.id.to_s