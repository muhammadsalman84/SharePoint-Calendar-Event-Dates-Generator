# SharePoint-Calendar-Event-Dates-Generator
SharePoint Calendar saves an event with recurrence rules as xml format in RecurrenceData column. 
The following is an example for recurrence rule.


~~~ xml
<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><monthly monthFrequency="1" day="16" /></repeat><repeatForever>FALSE</repeatForever></rule></recurrence>
~~~


If someone is looking for a library that generates the same list of dates by looking into the RecurrenceData column then do check the datesgenerator.js library. This library will generate you list of dates based on recurrence rule. I have first implemented this library and used it as an example in this project.. cheers. :)

