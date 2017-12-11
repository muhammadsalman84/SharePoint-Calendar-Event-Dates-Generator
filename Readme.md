# SharePoint-Calendar-Event-Dates-Generator
SharePoint Calendar saves an event with recurrence rules as xml format in RecurrenceData column. 
The following is an example for recurrence rule.


~~~ xml
<recurrence><rule><firstDayOfWeek>su</firstDayOfWeek><repeat><monthly monthFrequency="1" day="16" /></repeat><repeatForever>FALSE</repeatForever></rule></recurrence>
~~~


A javascript library that generates the list of dates by using the RecurrenceData column of a SharePoint Calendar List. This library will generate a list of dates based on recurrence rule (xml). I have first implemented this library and used it here to show how one can use this javascript library.. cheers. :)

