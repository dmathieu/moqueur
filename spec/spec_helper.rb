require 'harmony'
require 'json'

Spec::Runner.configure do |config|
  
  config.before :each do
    @page = Harmony::Page.new
    @page.load('spec/jquery/1.4.2.js')
    @page.load('moqueur.js')
    @page.load('spec/fixtures/default_mocks.js')
  end
end