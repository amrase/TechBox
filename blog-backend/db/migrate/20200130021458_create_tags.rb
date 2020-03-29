class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.references :category, null: false, foreign_key: true
      t.references :blog, null: false, foreign_key: true
      t.references :news, null: false, foreign_key: true

      t.timestamps
    end
  end
end
