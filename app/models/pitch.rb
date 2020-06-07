class Pitch
  include Mongoid::Document
  include Mongoid::Timestamps

  field :pitch, type: String
  validates :pitch, presence: true
  
  belongs_to :user
end
