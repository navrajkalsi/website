def remove_chars(word, n):
    list = []
    str = ""
    for w in word:
        list.append(w)
    for s in list[n:]:
        str += s
    return(str)

print(remove_chars("navraj", 2))