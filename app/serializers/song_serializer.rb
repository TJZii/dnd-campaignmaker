class SongSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :url

  belongs_to :playlist
end
