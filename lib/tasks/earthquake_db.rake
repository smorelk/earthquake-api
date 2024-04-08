namespace :earthquake_db do
  desc "TODO"
  task populate: :environment do
    require 'net/http'
    require 'json'
    require 'date'

    # Basic stats
    #
    saved = 0
    duplicates = 0
    invalid_records = 0

    uri = URI('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    response = Net::HTTP.get(uri)
    parsed_json = JSON.parse(response)
    parsed_json['features'].each do |feature|
      feat = Feature.new do |f|
        f.external_id = feature['id']
        f.magnitude = feature['properties']['mag']
        f.place = feature['properties']['place']
        # Unix timestamp (in milliseconds) to Date Time String
        f.time = DateTime.strptime(feature['properties']['time'].to_s, '%Q').to_s
        f.url = feature['properties']['url']
        f.tsunami = feature['properties']['tsunami'] == 0 ? false : true
        f.magType = feature['properties']['magType']
        f.title = feature['properties']['title']
        f.longitude = feature['geometry']['coordinates'][0]
        f.latitude = feature['geometry']['coordinates'][1]
      end

      # If all validations went well and record is not in DB, persist it!
      # See: models/feature.rb
      if feat.valid?
        if !Feature.exists?(external_id:feat.external_id)
            feat.save
            saved += 1
        else
            duplicates += 1
        end
      else
        invalid_records += 1
      end
    end

    puts "** STATS **"
    puts "Saved Records: #{saved}"
    puts "Duplicate entries (not committed to DB): #{duplicates}"
    puts "Invalid Records: #{invalid_records}"
  end

end
