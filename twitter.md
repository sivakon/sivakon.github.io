## Twitter API in Swift

Analyzing tweets with twitter API in Swift without any external libraries


```swift
import Foundation


struct Endpoint {
    let path: String
    let queryItems: [URLQueryItem]
}


extension Endpoint {
    static func searchTwitter(_ query:String, _ count: Int) -> Endpoint {
        return Endpoint(
            path: "/1.1/search/tweets.json",
            queryItems: [
                URLQueryItem(name: "q", value: query),
                URLQueryItem(name: "count", value: String(count)),
                URLQueryItem(name: "result_type", value: "mixed"),
                URLQueryItem(name: "lang", value: "en")
                
            ]
        )
    }
}

extension Endpoint {
    
    var url: URL? {
        var components = URLComponents()
        components.scheme = "https"
        components.host = "api.twitter.com"
        components.path = path
        components.queryItems = queryItems
        
        return components.url
    }
}

```

Extension methods allows good abstraction over `URLRequest` in Foundation. We generate `Endpoint` from static function. Use `Endpoint.url` to get the `URL`. 


```swift

let endpoint = Endpoint.searchTwitter("#coronavirus", 10) // static factory method to construct the Endpoint


let twitterURL = endpoint.url

// Construct URLRequest from URL
var ghRequest = URLRequest(url: twitterURL!)


ghRequest.httpMethod = "GET"
ghRequest.setValue("Bearer AAAATOKEN", forHTTPHeaderField: "Authorization")

// semaphore required for yielding async tasks

let semaphore = DispatchSemaphore(value: 0)

let taskGh = URLSession.shared.dataTask(with: ghRequest) { (data, response, error) in
    if let error = error {
        print("error \(error)")
        return
    }

    guard let data = data else { return }
    
    let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
    
    if let statuses = json!["statuses"] as? [[String: Any]] {
        for i in statuses {
            print(i["text"]!)
        }
    } else {
        print("Wrong with the OAuth token Authentication")
    }
    
        
    semaphore.signal()
}

taskGh.resume()

_ = semaphore.wait(wallTimeout: .distantFuture)


```