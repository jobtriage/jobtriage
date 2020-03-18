class Application
  include Mongoid::Document

  field :title, type: String
  field :description, type: String
  field :url, type: String
  field :location, type: String
  field :status, type: String
  field :priority, type: Integer
  field :company, type: Hash
  has_many :notes

  belongs_to :user

  validates :title, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :company, presence: true

  def set_company(name, url)
    url = url == nil ? company[:url] : url
    self.company = { name: name, url: url }
  end

  def as_json(*args)
    res = super
    res['_id'] = id.to_s
    res['id'] = id.to_s
    res['user_id'] = user_id.to_s
    res['notes'] = notes.as_json
    res
  end
end
