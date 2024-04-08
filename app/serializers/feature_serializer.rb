class FeatureSerializer < ActiveModel::Serializer
  attributes :id, :type, :attributes_, :links

  def type
    "feature"
  end

  def attributes_
    {
      external_id: object.external_id,
      magnitude: object.magnitude,
      place: object.place,
      time: object.time,
      tsunami: object.tsunami,
      mag_type: object.magType,
      title: object.title,
      coordinates: {
        longitude: object.longitude,
        latitude: object.latitude
      }
    }
  end

  def links
    {
      external_url: object.url
    }
  end
end
