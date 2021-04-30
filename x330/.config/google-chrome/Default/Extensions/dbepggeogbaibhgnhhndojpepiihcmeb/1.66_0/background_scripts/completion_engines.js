// Generated by CoffeeScript 1.12.7
(function() {
  var Amazon, AmazonJapan, BaseEngine, Bing, CompletionEngines, DuckDuckGo, DummyCompletionEngine, Google, GoogleMaps, GoogleXMLBaseEngine, Qwant, UpToDate, Webster, Wikipedia, Youtube, root,
    extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseEngine = (function() {
    function BaseEngine(options) {
      extend(this, options);
      if ("string" === typeof this.regexps) {
        this.regexps = [this.regexps];
      }
      this.regexps = this.regexps.map(function(regexp) {
        return new RegExp(regexp);
      });
    }

    BaseEngine.prototype.match = function(searchUrl) {
      return Utils.matchesAnyRegexp(this.regexps, searchUrl);
    };

    BaseEngine.prototype.getUrl = function(queryTerms) {
      return Utils.createSearchUrl(queryTerms, this.engineUrl);
    };

    return BaseEngine;

  })();

  GoogleXMLBaseEngine = (function(superClass) {
    extend1(GoogleXMLBaseEngine, superClass);

    function GoogleXMLBaseEngine() {
      return GoogleXMLBaseEngine.__super__.constructor.apply(this, arguments);
    }

    GoogleXMLBaseEngine.prototype.parse = function(xhr) {
      var i, len, ref, results, suggestion;
      ref = xhr.responseXML.getElementsByTagName("suggestion");
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        suggestion = ref[i];
        if (!(suggestion = suggestion.getAttribute("data"))) {
          continue;
        }
        results.push(suggestion);
      }
      return results;
    };

    return GoogleXMLBaseEngine;

  })(BaseEngine);

  Google = (function(superClass) {
    extend1(Google, superClass);

    function Google() {
      Google.__super__.constructor.call(this, {
        engineUrl: "https://suggestqueries.google.com/complete/search?ss_protocol=legace&client=toolbar&q=%s",
        regexps: "^https?://[a-z]+\\.google\\.(com|ie|co\\.(uk|jp)|ca|com\\.au)/",
        example: {
          searchUrl: "https://www.google.com/search?q=%s",
          keyword: "g"
        }
      });
    }

    return Google;

  })(GoogleXMLBaseEngine);

  GoogleMaps = (function(superClass) {
    extend1(GoogleMaps, superClass);

    GoogleMaps.prototype.prefix = "map of ";

    function GoogleMaps() {
      GoogleMaps.__super__.constructor.call(this, {
        engineUrl: "https://suggestqueries.google.com/complete/search?ss_protocol=legace&client=toolbar&q=" + (this.prefix.split(' ').join('+')) + "%s",
        regexps: "^https?://[a-z]+\\.google\\.(com|ie|co\\.(uk|jp)|ca|com\\.au)/maps",
        example: {
          searchUrl: "https://www.google.com/maps?q=%s",
          keyword: "m",
          explanation: "This uses regular Google completion, but prepends the text \"<tt>map of</tt>\" to the query.  It works\nwell for places, countries, states, geographical regions and the like, but will not perform address\nsearch."
        }
      });
    }

    GoogleMaps.prototype.parse = function(xhr) {
      var i, len, ref, results, suggestion;
      ref = GoogleMaps.__super__.parse.call(this, xhr);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        suggestion = ref[i];
        if (!suggestion.startsWith(this.prefix)) {
          continue;
        }
        results.push(suggestion.slice(this.prefix.length));
      }
      return results;
    };

    return GoogleMaps;

  })(GoogleXMLBaseEngine);

  Youtube = (function(superClass) {
    extend1(Youtube, superClass);

    function Youtube() {
      Youtube.__super__.constructor.call(this, {
        engineUrl: "https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&xml=t&q=%s",
        regexps: "^https?://[a-z]+\\.youtube\\.com/results",
        example: {
          searchUrl: "https://www.youtube.com/results?search_query=%s",
          keyword: "y"
        }
      });
    }

    return Youtube;

  })(GoogleXMLBaseEngine);

  Wikipedia = (function(superClass) {
    extend1(Wikipedia, superClass);

    function Wikipedia() {
      Wikipedia.__super__.constructor.call(this, {
        engineUrl: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=%s",
        regexps: "^https?://[a-z]+\\.wikipedia\\.org/",
        example: {
          searchUrl: "https://www.wikipedia.org/w/index.php?title=Special:Search&search=%s",
          keyword: "w"
        }
      });
    }

    Wikipedia.prototype.parse = function(xhr) {
      return JSON.parse(xhr.responseText)[1];
    };

    return Wikipedia;

  })(BaseEngine);

  Bing = (function(superClass) {
    extend1(Bing, superClass);

    function Bing() {
      Bing.__super__.constructor.call(this, {
        engineUrl: "https://api.bing.com/osjson.aspx?query=%s",
        regexps: "^https?://www\\.bing\\.com/search",
        example: {
          searchUrl: "https://www.bing.com/search?q=%s",
          keyword: "b"
        }
      });
    }

    Bing.prototype.parse = function(xhr) {
      return JSON.parse(xhr.responseText)[1];
    };

    return Bing;

  })(BaseEngine);

  Amazon = (function(superClass) {
    extend1(Amazon, superClass);

    function Amazon() {
      Amazon.__super__.constructor.call(this, {
        engineUrl: "https://completion.amazon.com/search/complete?method=completion&search-alias=aps&client=amazon-search-ui&mkt=1&q=%s",
        regexps: "^https?://www\\.amazon\\.(com|co\\.uk|ca|de|com\\.au)/s/",
        example: {
          searchUrl: "https://www.amazon.com/s/?field-keywords=%s",
          keyword: "a"
        }
      });
    }

    Amazon.prototype.parse = function(xhr) {
      return JSON.parse(xhr.responseText)[1];
    };

    return Amazon;

  })(BaseEngine);

  AmazonJapan = (function(superClass) {
    extend1(AmazonJapan, superClass);

    function AmazonJapan() {
      AmazonJapan.__super__.constructor.call(this, {
        engineUrl: "https://completion.amazon.co.jp/search/complete?method=completion&search-alias=aps&client=amazon-search-ui&mkt=6&q=%s",
        regexps: "^https?://www\\.amazon\\.co\\.jp/(s/|gp/search)",
        example: {
          searchUrl: "https://www.amazon.co.jp/s/?field-keywords=%s",
          keyword: "aj"
        }
      });
    }

    AmazonJapan.prototype.parse = function(xhr) {
      return JSON.parse(xhr.responseText)[1];
    };

    return AmazonJapan;

  })(BaseEngine);

  DuckDuckGo = (function(superClass) {
    extend1(DuckDuckGo, superClass);

    function DuckDuckGo() {
      DuckDuckGo.__super__.constructor.call(this, {
        engineUrl: "https://duckduckgo.com/ac/?q=%s",
        regexps: "^https?://([a-z]+\\.)?duckduckgo\\.com/",
        example: {
          searchUrl: "https://duckduckgo.com/?q=%s",
          keyword: "d"
        }
      });
    }

    DuckDuckGo.prototype.parse = function(xhr) {
      var i, len, ref, results, suggestion;
      ref = JSON.parse(xhr.responseText);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        suggestion = ref[i];
        results.push(suggestion.phrase);
      }
      return results;
    };

    return DuckDuckGo;

  })(BaseEngine);

  Webster = (function(superClass) {
    extend1(Webster, superClass);

    function Webster() {
      Webster.__super__.constructor.call(this, {
        engineUrl: "https://www.merriam-webster.com/lapi/v1/mwol-search/autocomplete?search=%s",
        regexps: "^https?://www.merriam-webster.com/dictionary/",
        example: {
          searchUrl: "https://www.merriam-webster.com/dictionary/%s",
          keyword: "dw",
          description: "Dictionary"
        }
      });
    }

    Webster.prototype.parse = function(xhr) {
      var i, len, ref, results, suggestion;
      ref = JSON.parse(xhr.responseText).docs;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        suggestion = ref[i];
        results.push(suggestion.word);
      }
      return results;
    };

    return Webster;

  })(BaseEngine);

  Qwant = (function(superClass) {
    extend1(Qwant, superClass);

    function Qwant() {
      Qwant.__super__.constructor.call(this, {
        engineUrl: "https://api.qwant.com/api/suggest?q=%s",
        regexps: "^https?://www\\.qwant\\.com/",
        example: {
          searchUrl: "https://www.qwant.com/?q=%s",
          keyword: "qw"
        }
      });
    }

    Qwant.prototype.parse = function(xhr) {
      var i, len, ref, results, suggestion;
      ref = JSON.parse(xhr.responseText).data.items;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        suggestion = ref[i];
        results.push(suggestion.value);
      }
      return results;
    };

    return Qwant;

  })(BaseEngine);

  UpToDate = (function(superClass) {
    extend1(UpToDate, superClass);

    function UpToDate() {
      UpToDate.__super__.constructor.call(this, {
        engineUrl: "https://www.uptodate.com/services/app/contents/search/autocomplete/json?term=%s&limit=10",
        regexps: "^https?://www\\.uptodate\\.com/",
        example: {
          searchUrl: "https://www.uptodate.com/contents/search?search=%s&searchType=PLAIN_TEXT&source=USER_INPUT&searchControl=TOP_PULLDOWN&autoComplete=false",
          keyword: "upto"
        }
      });
    }

    UpToDate.prototype.parse = function(xhr) {
      return JSON.parse(xhr.responseText).data.searchTerms;
    };

    return UpToDate;

  })(BaseEngine);

  DummyCompletionEngine = (function(superClass) {
    extend1(DummyCompletionEngine, superClass);

    function DummyCompletionEngine() {
      DummyCompletionEngine.__super__.constructor.call(this, {
        regexps: ".",
        dummy: true
      });
    }

    return DummyCompletionEngine;

  })(BaseEngine);

  CompletionEngines = [Youtube, GoogleMaps, Google, DuckDuckGo, Wikipedia, Bing, Amazon, AmazonJapan, Webster, Qwant, UpToDate, DummyCompletionEngine];

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.CompletionEngines = CompletionEngines;

}).call(this);