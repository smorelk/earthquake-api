class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      t.string :external_id
      t.decimal :magnitude
      t.string :place
      t.string :url
      t.boolean :tsunami
      t.string :magType
      t.string :title
      t.decimal :longitude
      t.decimal :latitude
      t.string :time

      t.timestamps
    end
  end
end
