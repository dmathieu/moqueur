require 'spec_helper'

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
    JSON.parse(@page.execute_js("JSON.stringify(jQuery.ajax({url: '/hello'}))"))['url'].should be_nil
  end

  describe 'with regex' do
    it 'should mock an ajax with a regexp' do
      @page.execute_js("jQuery.ajax({
        url: '/regex/1234',
        success: function() { return 'Executed Success method with regex'; }
      })").should eql('Executed Success method with regex')
    end

    it 'should give the param in the content when regex' do
      @page.execute_js("jQuery.ajax({
        url: '/regex/1234'
      })").should eql('Request with regex. Param: 1234')
    end
  end

  describe 'with method specified' do
    it 'should mock a get request' do
      @page.execute_js("jQuery.ajax({
        url: '/get_request',
        type: 'GET'
      })").should eql('Standard request available only in GET')
    end

    it 'should also take a type lower cased' do
      @page.execute_js("jQuery.ajax({
        url: '/get_request',
        type: 'get'
      })").should eql('Standard request available only in GET')
    end

    it 'should not mock it in post' do
      @page.execute_js("jQuery.ajax({
        url: '/get_request',
        type: 'POST'
      })").should_not eql('Standard request available only in GET')
    end

    it 'should mock by default whatever the type is' do
      @page.execute_js("jQuery.ajax({
      url: '/test',
      type: 'POST',
      success: function() { return 'Executed Success method'; }
    })").should eql('Executed Success method')
    end
  end
end
