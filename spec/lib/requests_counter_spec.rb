require 'spec/spec_helper'

describe 'Counting the ajax requests' do
  
  it 'should mock an ajax request' do
    @page.execute_js("jQuery.counter.length").should eql(0)
  end
  
  it 'should increment the number of calls' do
    lambda do
      @page.execute_js("jQuery.ajax({url: '/test'})")
    end.should change(@page.execute_js("jQuery.counter"), :count).by(1)
  end
end