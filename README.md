## Nestjs Early Access.  

This NestJs package makes it easy to add early access mode to your existing application. This is useful when you want to launch a product and need to gather the email addresses of people who want early access or want to stay on the waiting list of the application.

# Table of Contents

- [NestJS Throttler Package](#nestjs-early-starter)
- [Table of Contents](#table-of-contents)
- [Usage](#usage)
	-	[Installation](#installation)
  - [EarlyAccessModule](#earlyaccessmodule)
	   - [Synchonous Mode](#synchonous-mode)
	   - [Asynchronous Mode](#asynchronous-mode)
  - [Using Custom Assets](#using-custom-assets)
  -  [API Spec](#api-spec)
  - [Providing the early access url](#providing-the-early-access-URL)
  - [EarlyAccessRepository](#earlyaccessrepository)
- [Todos](#todos)
- [Credits](#credits)

## Usage

### Installation
```bash
npm install nestjs-early-access
``` 
###  EarlyAccessModule
This EarlyAccessModule is the core of the package, it serves as the main entry point and can be used in both synchronous and asynchronous manner.  
Simple import the `EarlyAccessModule` into your application.

#### Synchonous Mode
Simple call the `forRoot` method on the synchronous mode.

    EarlyAccessModule.forRoot({  
        enabled: true  
    })  
    export class AppModule {  
      
    }
 #### Asynchronous Mode

    EarlyAccessModule.registerAsync({  
      inject: [EarlyAccessService],  
      imports: [ServiceModule],  
      useFactory: (earlyAccessService: EarlyAccessService) => ({  
            repository: earlyAccessService,  
		    enabled: true,  
      }),  
    })  
      
    export class AppModule {  
     
    }

### Using Custom Assets
You can decide to use custom assets if you wish, although early access provides a default one out of the box for you.  If you provide a template early-access will use the provided template instead.

    EarlyAccessModule.forRoot({  
        enabled: false,  
		 template: {  
            viewDir: `${process.cwd()}/views`,  
    		assetsDir: `${process.cwd()}/assets`,  
    		index: 'index',  
      }  
    })  
    export class AppModule {  
      
    }

### API SPEC
| property            | type                  | description                                                                                                       |
|---------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------|
| enabled             | boolean               | This will activate early access when set to true and will set to false when otherwise.                           |
| URL                 | string                | This is the URL to use to access the early access page this defaults to "/early-access"                           |
| twitterHandle       | string                | This is the twitter handle of your products                                                                       |
| template            | Object                | This is the custom template you might wish to render if you do not want to use the default template.             |
| template.viewDir    | string                | This is the directory of your custom views                                                                        |
| template.assetsDir  | string                | This is the directory of the assets of your custom view.                                                          |
| template.index      | string                | This is the file that will be rendered. At this time early access uses .ejs.                                       |
| twitterShareMessage | string                | This is the message you will like to share on twitter when your user clicks share on twitter.                     |
| repository          | EarlyAccessRepository | This is the repository you will like to use to persist the subscribers as well as removed the subscribers |

  ### Providing the early access URL
  If you want to provide a custom URL. Provide `URL` in the forRoot object.

### EarlyAccessRepository
The `nestjs-early-access` uses an in-memory story to persist. You should provide your repository to persist subscribers as well as remove subscribers.

## Todos
- Provide a notification class or an event. So that this can be implemented or subscribed to when a subscriber is created or removed.

## Credits
This was inspired from Neo's [Laravel-early-access](https://github.com/neoighodaro)

## Appreciation
If you think you like this. Show me some love if you like this. Why don't you just star it? Maybe this can encourage me to build more.
  
 