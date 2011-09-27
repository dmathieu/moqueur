require 'spec_helper'

describe 'Counting the ajax requests' do

  it 'should mock an ajax request' do
    @page.execute_js("jQuery.counter.length").should eql(0)
  end

  it 'should increment the number of calls' do
    lambda do
      @page.execute_js("jQuery.ajax({url: '/test'})")
    end.should change(@page.execute_js("jQuery.counter"), :count).by(1)
  end

  it 'should create a call with the appropriate url' do
    @page.execute_js("jQuery.ajax({url: '/test'})")
    JSON.parse(@page.execute_js("JSON.stringify(jQuery.counter)")).last['url'].should eql('/test')
  end

  it 'should say the url has been mocked' do
     @page.execute_js("jQuery.ajax({url: '/test'})")
    JSON.parse(@page.execute_js("JSON.stringify(jQuery.counter)")).last['mocked'].should eql(true)
  end

  it 'should say the url has not been mocked' do
    @page.execute_js("jQuery.ajax({url: '/hello'})")
    JSON.parse(@page.execute_js("JSON.stringify(jQuery.counter)")).last['mocked'].should eql(false)
  end
end
