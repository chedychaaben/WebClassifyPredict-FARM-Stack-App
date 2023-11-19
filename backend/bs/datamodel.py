import nltk
import re
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
lst_stopwords = nltk.corpus.stopwords.words("french")



def name(url):
    nom = url.replace('https://', '')
    nom = nom.replace('www.', '')
    reg = re.findall('(\.\w*\/?\w*)', nom)
    nom = nom.replace(reg[0], '')
    return(nom)

def titleSite(soup):
    return(soup.title.text.replace('Ã©', 'é'))

def collectData(soup,url):
    li = []
    text = ''
    nom=name(url)
    reg = '(\w?\/n\s?)'
    listrem=['copyright','phone','télé',"mail",'contact','menu',"immeuble","voir plus" ,"powered by",'afficher plus' ,"tél",'découvrir plus']
    listrep=["+","  ", reg , '\n ','\n',nom ,"#" ,'\xa0' ,'\\','%','_','/','\t','*','facebook','linkedin','youtube','tous droits réservés']
    find = soup.find_all(['p', 'span'])
    for i in find:
        j = i.text.lower()
        j = j.replace("ã©", 'é')
        j = ''.join(i for i in j if not i.isdigit())
        for k in listrep:
            j=j.replace(k,'')
        if (j != ''):
            li.append(j)
        for k in listrem :
            if k in j :
                if j in li:
                    li.remove(j)
                
            
    text = " ".join(li)
    text = re.sub(r'[^\w\s]', '', str(text).lower().strip())
    lst_text = text.split()
    if lst_stopwords is not None:
        lst_text = [word for word in lst_text if word not in lst_stopwords]
    lem = nltk.stem.wordnet.WordNetLemmatizer()
    lst_text = [lem.lemmatize(word) for word in lst_text]
    text = " ".join(lst_text)
    return(text)

def keywordsModel(text):
    kw_model = KeyBERT()
    keywords=kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 3), stop_words=None,top_n=15,use_maxsum=True)
    l=''
    for kw in keywords:
        l=l+" "+kw[0]
    return(l)

def SimilarityModel(string):
    sentences=['agence de développement entreprise solution télecom développement mobile web site web degital innovation informatique technology service it services du numérique software data ingénieur application agile technologies innovantes',string]
    model_name='bert-base-nli-mean-tokens'
    model= SentenceTransformer(model_name)
    sentence_embeddings = model.encode(sentences)
    from sklearn.metrics.pairwise import cosine_similarity
    similarity_score = cosine_similarity(
        [sentence_embeddings[0]],
        sentence_embeddings[1:]
    ).flatten()
    return(similarity_score)

def mainData(soup,url):
    text=collectData(soup,url)
    kw=keywordsModel(text)
    similarityscore=SimilarityModel(kw)
    print(similarityscore)
    return(similarityscore)
