class Timelog
  include Mongoid::Document
  include Mongoid::Timestamps

  field :type, type: String
  field :note, type: String
  field :time, type: DateTime
  
  belongs_to :application

  validates :type, presence: true
end
