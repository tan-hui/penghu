// **********************************************************************
// Copyright (C) 2017 The company name
//
// 文件名(FileName):			Language.lua
// 作者(Author):				
// 创建时间(Data):			2018-02-05
// 模块描述(Description):    语言包
// **********************************************************************
var languagetable_zh = require('./languagetable_zh');

window.Language = {}
Language.getText = function(key, ...args) 
{
    var string = languagetable_zh[key]
    if (arguments.length >= 1 && string)
    {
        return string.format(...args)
    }
    return key
}