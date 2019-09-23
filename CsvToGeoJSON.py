import csv

# Read tornado data from csv
tornadoData = csv.reader(open('2017_torn.csv', 'r'))

# Create a template that will format the CSV data into GeoJSON
template = \
   ''' \
   { "type" : "Feature",
       "geometry" : {
           "type" : "Point",
           "coordinates" : [%s, %s]},
       "properties" : { "date" : "%s", "len" : "%s", "wid" : "%s"}
       },
   '''

# GeoJSON file header
output = \
   ''' \

{ "type" : "Feature Collection",
   "features" : [
   '''

# Iterate through rows of data, skipping first header row (counter >= 1)
counter = 0;
for row in tornadoData:
    if counter >= 1:
        slat = row[15]
        slon = row[16]
        date = row[4]
        len = row[19]
        wid = row[20]
        output += template % (slon, slat,  date,  len, wid)
    counter+=1

# append closing elements to end of GeoJSON
output += \
   ''' \
   ]
}
   '''

# Creates the output file and writes the formatted GeoJSON to it
outputFile = "tornados.geojson"
outFileHandle = open(outputFile, "w")
outFileHandle.write(output)
outFileHandle.close()
