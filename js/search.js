
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[type="search"]');

  // إنشاء صندوق النتائج مخفي افتراضيًا
  const resultDiv = document.createElement("div");
  resultDiv.id = "searchResults";
  resultDiv.style.cssText =
    "position:fixed;bottom:10px;right:10px;background:#fff;padding:5px;border:1px solid #ccc;z-index:10000;font-size:14px;display:none;";
  resultDiv.innerHTML = `
<span id="resultCount">0</span> results
<button id="prevBtn">↑</button>
<button id="nextBtn">↓</button>
`;
  document.body.appendChild(resultDiv);

  let highlights = []; // لتخزين العناصر التراكبية
  let currentIndex = -1;

  // دالة لتأمين النص المدخل لتفادي مشاكل RegExp
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // إزالة التراكبات القديمة
  function removeHighlights() {
    highlights.forEach((hl) => {
      if (hl.element && hl.element.parentNode) {
        hl.element.parentNode.removeChild(hl.element);
      }
    });
    highlights = [];
    currentIndex = -1;
  }

  // دالة البحث وإنشاء تراكب على النصوص المطابقة
  function highlight(term) {
    if (!term) return;
    const regex = new RegExp(escapeRegExp(term), "gi");

    // استخدام TreeWalker لتصفح العقد النصية
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (node.parentNode && ["SCRIPT", "STYLE", "VIDEO"].includes(node.parentNode.nodeName))
          return NodeFilter.FILTER_REJECT;
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue;
      let match;
      // البحث عن كل المطابقات داخل النص
      while ((match = regex.exec(text)) !== null) {
        const range = document.createRange();
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        const rects = range.getClientRects();

        // لكل مستطيل (لأن النص ممكن يكون ملتف لعدة أسطر)
        for (let rect of rects) {
          const hl = document.createElement("div");
          hl.className = "highlight-overlay";
          hl.style.position = "absolute";
          hl.style.backgroundColor = "yellow";
          hl.style.opacity = "0.5";
          hl.style.pointerEvents = "none";
          // تعيين الموقع بناءً على موقع المستطيل
          hl.style.left = rect.left + window.scrollX + "px";
          hl.style.top = rect.top + window.scrollY + "px";
          hl.style.width = rect.width + "px";
          hl.style.height = rect.height + "px";
          // رفع العنصر فوق باقي العناصر
          hl.style.zIndex = "9999";
          document.body.appendChild(hl);
          highlights.push({ element: hl, range: range });
        }
      }
    }
  }

  // تحديث واجهة النتائج
  function updateResultUI() {
    document.getElementById("resultCount").textContent = highlights.length;
  }

  // التنقل بين النتائج والتأكيد عليها
  function scrollToHighlight(index) {
    if (highlights.length === 0) return;
    if (index < 0) index = highlights.length - 1;
    if (index >= highlights.length) index = 0;
    currentIndex = index;
    // استعادة التنسيق لكل العناصر
    highlights.forEach((hl) => {
      hl.element.style.backgroundColor = "yellow";
      hl.element.style.opacity = "0.5";
    });
    // تمييز العنصر الحالي
    const currentHl = highlights[currentIndex];
    currentHl.element.style.backgroundColor = "orange";
    currentHl.element.style.opacity = "0.8";
    // التمرير إلى العنصر الحالي
    currentHl.element.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // عند تغيير النص في خانة البحث
  searchInput.addEventListener("input", function () {
    removeHighlights();
    const term = searchInput.value.trim();
    if (term === "") {
      resultDiv.style.display = "none";
      updateResultUI();
      return;
    }
    resultDiv.style.display = "block";
    highlight(term);
    updateResultUI();
    if (highlights.length > 0) {
      scrollToHighlight(0);
    }
  });

  // أزرار التنقل بين النتائج
  document.getElementById("prevBtn").addEventListener("click", function () {
    if (highlights.length > 0) {
      scrollToHighlight(currentIndex - 1);
    }
  });
  document.getElementById("nextBtn").addEventListener("click", function () {
    if (highlights.length > 0) {
      scrollToHighlight(currentIndex + 1);
    }
  });
});