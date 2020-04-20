class Analysis
  include Mongoid::Document

  field :title, type: String
  field :content, type: String

  belongs_to :user

  validates :title, presence: true
  validates :content, presence: true

  def as_json(*args)
    res = super
    res['_id'] = id.to_s
    res['id'] = id.to_s
    res['user_id'] = user_id.to_s
    res
  end
end
