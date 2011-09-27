require 'harmony'
require 'json'

RSpec.configure do |config|

  config.before :each do
    @page = Harmony::Page.new
    @page.load('spec/jquery/1.6.4.js')
    @page.load('moqueur.js')
    @page.load('spec/fixtures/default_mocks.js')
  end
end
