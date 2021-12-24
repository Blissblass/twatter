class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  before_create :attach_file

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :twats, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :followers, class_name: 'Follow', foreign_key: 'followee_id', dependent: :destroy
  has_many :follows, class_name: 'Follow', foreign_key: 'follower_id', dependent: :destroy
  has_many :comments
  has_one_attached :image
  validates :username, presence: true, length: {maximum: 10}
  
  

  def attach_file 
    self.image.attach(io: File.open(Rails.root.join('app', 'assets', 'images', 'placeholder-icon.jpg')), filename: 'default-image.png', 
      content_type: 'image/jpg')
  end
end
