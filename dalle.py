import os
import replicate
os.environ['REPLICATE_API_TOKEN'] = 'c67e47d47af21e2cfb6223c3f72d9993e5e6168f';
model = replicate.models.get("borisdayma/dalle-mini");
output = model.predict(prompt="The Grinch by Trippie Redd",n_predictions='1');
model.predict(image=open("mystery.jpg",'rb'));
