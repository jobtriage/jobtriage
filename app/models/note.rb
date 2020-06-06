class Note
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :content, type: String
  
  belongs_to :application

  validates :content, presence: true
  validates :title, presence: true

end
