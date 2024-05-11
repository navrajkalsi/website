str = "pynative"
j = int(len(str))

print(f"Original String is {str}")
print("Printing only even index chars")
for i in range(0, j, 2):
    print(str[i])