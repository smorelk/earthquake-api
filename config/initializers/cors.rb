# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin requests.

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
   origins "*"

   resource "*",
     headers: :any,
     methods: [:get, :post]
 end
end
