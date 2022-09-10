<p align="center"><img src="/demos/logo.png" alt="GSoC with WMF"></p>

## 📌Introduction
 - Name: [Ankit Gupta](https://github.com/Ankit-Gupta18)
 - Organisation: WikiMedia Foundation
 - Project Name: Edit Request Wizard
 - Project Link: https://summerofcode.withgoogle.com/programs/2022/projects/u0WNs8PY
 - Mentors: [Enterprisey](https://github.com/enterprisey), [siddharthvp](https://github.com/siddharthvp)
 - Project Repository: https://github.com/Ankit-Gupta18/Edit-Request-Wizard

 ## 📌About

 Google Summer of Code is a global program focused on bringing more student developers into open source software development. Students work with an open-source organization on a 10-week programming project during their break from school.

It matches students with open source, free software, and technology-related organizations to write code and become part of these communities.

## 📌WikiMedia Foundation

Wikimedia Foundation provides the essential infrastructure for free knowledge. The Foundation hosts Wikipedia, the free online encyclopedia, created, edited, and verified by volunteers around the world, as well as many other vital community projects. It is the same organization that has helped us in our school projects by providing us legitimate information about any topic we can think of, by gifting us the mighty Wikipedia!

When somebody asks me, “Hey, what made you write the proposal to Wikimedia Foundation?", I smile and ask back another question, “Could you imagine somebody, living, that works every single day with the sole purpose of providing educational content to the entire world for free?"

That’s the organization I got the opportunity to contribute to this summer.

## 📌What is my GSoC project all about?

My project aims at creating a step-by-step form to help beginners submit a Wikipedia edit request. An edit request is a request for someone to change some text in an article. Edit requests are an important part of Wikipedia. The form created in this project will help the edit requests comply with Wikipedia policy. It will be developed as a Wikipedia user script that shows a form for submitting a Wikipedia edit request, with high-quality guidance and error messages, suitable for use by beginners, and a backend server that the user script will make calls to for validation of source and quote.

<p align="center"><img src="/demos/1.png" alt="GSoC with WMF"></p>
<p align="center"><img src="/demos/2.png" alt="GSoC with WMF"></p>
<p align="center"><img src="/demos/3.png" alt="GSoC with WMF"></p>
<p align="center"><img src="/demos/4.png" alt="GSoC with WMF"></p>
<p align="center"><img src="/demos/5.png" alt="GSoC with WMF"></p>

Edit Request on Talk page
<p align="center"><img src="/demos/edit request.png" alt="GSoC with WMF"></p>

## 📌Final Words

The past three months as a student developer at Wikimedia Foundation have been nothing short of excitement. I have learned a lot of things along the way by being in an inclusive and diverse community. It’s a community that encourages every member to speak up and feels welcomed.

I am thankful to my GSoC mentors: Enterprisey and siddharthvp, for their constant support throughout the program. The project would not have been completed without their invaluable guidance, encouragement, and impeccable knowledge. I hope to keep in touch with these guys even after GSoC ❤️

Also, special thanks to the organization’s admins: Srishti Sethi, Aisha Khatun and Gopa Vasanth for maintaining a welcoming environment in the community and being such humble people.

## 📌How to run it?

Tip: It's much easier if you get [ScriptInstaller](https://en.wikipedia.org/wiki/User:Enterprisey/script-installer), then navigate to `User:Ankit18gupta/Editwizard.js` and click "Install" at the top.

However, here's the manual method:

 - Place `{{subst:iusc|User:Ankit18gupta/Editwizard.js}}` on `Special:MyPage/common.js` or a skin-specific page, like `Special:MyPage/vector.js`
 - Clear your cache and enjoy!
If you don't want to test the script on the English Wikipedia, you can install it on testwiki by going to `testwiki:Special:MyPage/common.js` and adding, on a new line:
`mw.loader.load('//en.wikipedia.org/w/index.php?title=User:Ankit18gupta/Editwizard.js&action=raw&ctype=text/javascript');`

# 📌Bug report
Feel free to [open an issue](https://github.com/Ankit-Gupta18/Edit-Request-Wizard/issues) if you find any bug.

# 📌Feature request
Feel free to [open an issue](https://github.com/Ankit-Gupta18/Edit-Request-Wizard/issues) to request any additional features you might need for your use case.

# 📌License
See `LICENSE` for more information.

# 📌Blog posts
All of my blog posts related to the project can be found [here](https://ankit-blog.netlify.app/).

# 📌Special note
This project is created as part of Google Summer of Code 2022 with my mentoring organization being **Wikimedia Foundation.** Once deployed on Wikipedia, I'll update the deployed link in the repository.

<p align="center"><img src="/demos/logo.png" alt="GSoC with WMF"></p>

