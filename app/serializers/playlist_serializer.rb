class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id

  has_many :songs
end
