class Application
  include Mongoid::Document

  field :title, type: String
  field :description, type: String
  field :url, type: String
  field :location, type: String
  field :status, type: String
  field :priority, type: Integer
  field :company, type: Hash

  belongs_to :user

  validates :title, presence: true
  validates :status, presence: true
  validates :priority, presence: true
  validates :company, presence: true

  def set_company(name, url)
    self.company = { name: name, url: url }
  end

  def as_json(*args)
    res = super
    res['_id'] = self.id.to_s
    res['user_id'] = self.user_id.to_s
    res
  end
end
