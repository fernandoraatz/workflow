/*
|--------------------------------------------------------------------------
| Class - Anagram
|--------------------------------------------------------------------------
*/

function isAnagram(str1, str2){
    str1 = str1.toString().replace('.','').toLowerCase().split('').sort().join('');
    str2 = str2.toString().replace('.','').toLowerCase().split('').sort().join('');

    return str1 === str2;
}

/*
|--------------------------------------------------------------------------
| Tests - Anagram
|--------------------------------------------------------------------------
*/

xdescribe('Anagram', function(){
  it('is true when "abc" and "cba"', function(){
    expect(isAnagram('abc', 'cba')).toEqual(true);
  })
  it('is true when "Amor" and "Roma"', function(){
    expect(isAnagram('Amor', 'Roma')).toEqual(true);
  })
  it('is true when two empty strings', function(){
    expect(isAnagram('', '')).toEqual(true);
  })
  it('is true when "132" and 312', function(){
    expect(isAnagram('132', 312)).toEqual(true);
  })
  it('is true when "0.12" and "102"', function(){
    expect(isAnagram('0.12', '102')).toEqual(true);
  })
  it('is true when 0.12 and "102"', function(){
    expect(isAnagram(0.12, '102')).toEqual(true);
  })
  it('is false when 012 and 102', function(){
    expect(isAnagram(012, 102)).toEqual(false);
  })
})
