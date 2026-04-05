# Ben Pennycook's learning log - AWS hosting

## Entry 1 - Starting out.

### My prior experience with cloud computing 

Long before beginning this project (2023) I began the IBM Full Stack Software Developer Professional Certificate. Despite never finishing it due to A-Levels and the like, one major section of the course I completed was the cloud computing one. 
  
> [The IBM Full Stack Software Developer Professional Certificate](https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer)
  
Unsurprisingly I don't remember much from the course, which makes tackling the AWS side of this project even more exciting for me. This is an opportunity to get back into cloud computing and gain some career-relevant experience. What I do remember from the course, is that  

### What is AWS anyway?

AWS (Amazon Web Services) is the world's biggest cloud computing platform. With datacentres globally, it is used by huge companies such as:

- Sony, who spend $11M monthly
- Adobe, who spend $7.5M monthly
- Facebook, who spend $5.6M monthly

By being the first in the cloud computing market Amazon were able to set industry standards and never struggled to pick up big customers like the aforementioned Sony, who signed up in 2012 in order to handle a growing player base on their PlayStation consoles. This, combined with AWS having little to no competition for years after its birth, led Amazon to easily dominate the cloud infrastructure world.

Amazon provides many different services with AWS, the most popular (according to Reddit) being:

- EC2, which provides virtual servers

- S3, which provides simple data storage

- Lambda, which provides serverless computing

### Which service will we use?

When researching these different services, and deciding what to finally use in this project, there were two major boxes I needed to tick. The service had to be completely free, and capable of deploying a React app. 

No AWS service is free, but luckily Amazon offers a 'Free Tier' which provides you with up to $200 in AWS Credits. Despite this, I have heard horror stories of people going over this $200 limit and racking up tens of thousands in debt due to usage costs. To prevent this, I researched ways to set buffers and alerts that activate once a certain number of free credits have been used. 

Regarding the second necessity, deploying a React app, I found many services capable of this. The most popular option was a combination of S3 and CloudFront, which store data and deliver data (respectively). However, since our project doesn't necessarily require a backend, I found Amazon's 'Amplify' to be a better option. This is because it can deploy a web app straight from a GitHub Repository, which was perfect for our small project that will be stored here on GitHub.

So the decision was made, I would be using Amazon's Amplify service to deploy our project's app.  


> Here's a meme:


![Markdown meme](MarkdownMeme.jpg)
