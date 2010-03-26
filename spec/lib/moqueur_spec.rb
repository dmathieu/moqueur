require 'spec/spec_helper'

describe 'Main specs' do
  
  it 'should mock an ajax request' do
    @page.execute_js("jQuery.ajax({url: '/test'})").should eql('Hello World !')
  end
  
  it 'should execute the success request' do
    @page.execute_js("jQuery.ajax({
      url: '/test',
      success: function() { return 'Executed Success method'; }
    })").should eql('Executed Success method')
  end
  
  it 'should not mock requests by default' do
    JSON.parse(@page.execute_js("JSON.stringify(jQuery.ajax({url: '/hello'}))"))['url'].should eql('file:///hello')
  end
  
  it 'should mock an ajax with a regexp' do
    @page.execute_js("jQuery.ajax({
      url: '/regex/1234',
      success: function() { return 'Executed Success method with regex'; }
    })").should eql('Executed Success method with regex')
  end
end